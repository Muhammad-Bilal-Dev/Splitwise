import "./User.css";
import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector(state => state.user).users;

  return (
    <>
      <footer id="site-footer">
        <div className="container clearfix">
          <div className="left">
            <h2 className="subtotal">Users</h2>
            <input className="search" placeholder="search user" />
            <h3 className="tax">List of all user who are friend your</h3>
          </div>
          <div className="right">
            <h1 className="total">
              Total User: <span>{users.length}</span>
            </h1>
            <p className="btn">Search</p>
          </div>
        </div>
      </footer>
      <div>
        {users?.map((user, index) => {
          return (
            <div key={index} className="container">
              <section id="cart">
                <article className="product">
                  <header>
                    <div className="remove">
                      <h3>Remove User</h3>
                    </div>
                  </header>
                  <div className="content">
                    <h1>{user.name}</h1>
                    A good person is someone who gets paid to work
                    for a person or company. Workers don't need to work full
                    time to be considered employees—they simply need to be paid
                    to work by an employer (the person or business that pays
                    them).
                  </div>
                  <footer className="content">
                    <span className="qt email">{user.email}</span>
                    <h2 className="full-price">{user.phone}</h2>
                    <h2 className="price">Phone</h2>
                  </footer>
                </article>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Users;
