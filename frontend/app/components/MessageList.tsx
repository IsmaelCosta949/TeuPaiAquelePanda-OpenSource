import { Link } from "react-router";
import { PandaMascot } from "./PandaMascot";
import { formatTime } from "../lib/format";
import { useMail } from "../lib/MailContext";

export function MessageList() {
  const { messages } = useMail();

  if (messages.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-panda-ink/20 dark:border-white/20 py-16 flex flex-col items-center gap-3 text-center">
        <PandaMascot className="w-20 aspect-333/344 opacity-70" />
        <p className="text-panda-gray dark:text-white/50 text-sm">
          Nenhum e-mail ainda. O panda tá cochilando esperando sua primeira
          mensagem 💤
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {messages.map((msg) => (
        <li
          key={msg.id}
          className="rounded-2xl border border-panda-ink/10 dark:border-white/10 bg-white dark:bg-panda-charcoal overflow-hidden"
        >
          <Link
            to={`/email/${msg.id}`}
            className="w-full text-left px-4 py-3 flex items-center gap-3"
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                msg.read ? "bg-transparent" : "bg-panda-red"
              }`}
            />
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-2">
                <span className="font-medium text-panda-ink dark:text-panda-paper truncate">
                  {msg.fromName}
                </span>
                <span className="text-xs text-panda-gray dark:text-white/40 shrink-0">
                  {formatTime(msg.receivedAt)}
                </span>
              </span>
              <span className="block text-sm text-panda-gray dark:text-white/60 truncate">
                {msg.subject}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
