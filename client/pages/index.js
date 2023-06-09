import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { dummyData } from "@/utils/dummyData";
import Card from "@/components/Card";

export default function Home({ data, result }) {
  const [text, setText] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [tasks, setTasks] = useState(result);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.tmToken) {
      toast.error("Login to add task");
      setTimeout(() => {
        router.replace("/auth/login");
      }, 5000);
      return;
    }
    if (!text) {
      toast.error("Task is required");
      return;
    }
    setLoading(true);

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.tmToken}`,
      },
      body: JSON.stringify({
        text,
        creator: data?.tmUser,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      toast.success(result.message);
      setText("");
      setTasks((prev) => [result.task, ...prev]);
      setLoading(false);
    } else {
      // toast.error()
      console.log(result);
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.tmToken}`,
      },
    });

    const idx = tasks.findIndex((item) => item._id === id);
    const updatedTasks = [...tasks];
    updatedTasks[idx] = {
      ...updatedTasks[idx],
      completed: true,
      updated_at: new Date().toISOString(),
    };
    setTasks(updatedTasks);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${data.tmToken}`,
      },
    });
    if (res.ok) {
      const filteredTasks = tasks.filter((task) => task._id !== id);
      setTasks(filteredTasks);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task Todo..."
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <div className="mt-5">
        {!data.tmToken &&
          hasMounted &&
          dummyData.map((item) => <Card key={item._id} item={item} />)}

        {data.tmToken &&
          hasMounted &&
          tasks.length > 0 &&
          tasks.map((item) => (
            <Card
              key={item._id}
              item={item}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const data = parseCookies(ctx);

  if (data.tmToken) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      headers: {
        Authorization: `Bearer ${data.tmToken}`,
      },
    });

    const result = await res.json();

    return {
      props: {
        data,
        result,
      },
    };
  }
  return {
    props: {
      data,
    },
  };
};
