import Pusher from "pusher-js";

const pusher = new Pusher("b0033561c05026152189", {
  cluster: "eu",
});

export default pusher;
