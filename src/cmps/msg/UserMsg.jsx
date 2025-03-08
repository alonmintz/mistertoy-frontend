import { useEffect, useState } from "react";
import { eventBusService } from "../../service/event-bus.service";

export function UserMsg() {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const unsubscribe = eventBusService.on("show-user-msg", (msg) => {
      setMsg(msg);
      setTimeout(onCloseMsg, 2000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function onCloseMsg() {
    setMsg(null);
  }

  if (!msg) return null;

  return (
    <section className={"user-msg " + msg.type}>
      <p>{msg.txt}</p>
    </section>
  );
}
