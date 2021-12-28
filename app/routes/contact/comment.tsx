import type { Comment } from "@prisma/client";


export default function Comments({ comments }: any) {

  return (
    <div className="container column">
      {comments.map((comment: Comment) => (
        <div className="column comment" key={comment.id}>
          <div
            className="container row"
            style={{
              borderBottom: "2px solid #49bf9d ",
              justifyContent: "space-around",
            }}
          >
            <h3 style={{ color: "gold", margin: 0 }}>
              {comment.name} -{" "}
              {new Date(comment.createdAt).toLocaleDateString()}
            </h3>
            <p>
              {comment.rating === 5
                ? "⭐️⭐️⭐️⭐️⭐️"
                : comment.rating === 4
                ? "⭐️⭐️⭐️⭐️"
                : comment.rating === 3
                ? "⭐️⭐️⭐️"
                : comment.rating === 2
                ? "⭐️⭐️"
                : "⭐️"}
            </p>
          </div>
          <h4 style={{ borderBottom: "1px solid #49bf9d " }}>
            {comment.title}{" "}
          </h4>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}