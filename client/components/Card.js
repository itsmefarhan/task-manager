import React from "react";

const Card = ({ item, handleComplete, handleDelete }) => {
  return (
    <div className="card mb-3 bg-dark bg-gradient">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="card-title">
            <h6
              style={{
                textDecoration: item.completed ? "line-through" : "",
              }}
              className='text-white'
            >
              {item.text}
            </h6>
          </div>
          <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(item._id)}>X</button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
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
  );
};

export default Card;
