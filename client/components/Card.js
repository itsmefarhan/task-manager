import React from "react";

const Card = ({ item, handleComplete }) => {
  return (
    <div className="card mb-3 bg-dark bg-gradient text-white">
      <div className="card-body">
        <div className="card-title">
          <h5
            style={{
              textDecoration: item.completed ? "line-through" : "",
            }}
          >
            {item.text}
          </h5>
          <div className="d-flex justify-content-between">
            <small className="text-white">
              {item.completed
                ? `Updated at: ${new Date(item.updated_at).toTimeString()}`
                : `Created at: ${new Date(item.created_at).toTimeString()}`}
            </small>

            <button
              className="btn btn-sm btn-primary"
              disabled={item.completed}
              onClick={() => handleComplete(item._id)}
            >
              {item.completed ? "Done" : "Pending"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
