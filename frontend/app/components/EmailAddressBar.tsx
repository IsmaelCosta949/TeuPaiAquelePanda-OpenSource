import { useState } from "react";
import { useNavigate } from "react-router";
import { ConfirmDialog } from "./ConfirmDialog";
import { formatClock } from "../lib/format";
import { useMail } from "../lib/MailContext";

export function EmailAddressBar() {
  const { address, secondsLeft, copied, handleCopy, randomAddress, clearAddress } =
    useMail();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  function handleNewAddressClick() {
    setConfirmOpen(true);
  }

  function confirmNewAddress() {
    setConfirmOpen(false);
    randomAddress();
  }

  function confirmDeleteAddress() {
    setDeleteConfirmOpen(false);
    clearAddress();
    navigate("/");
  }

  return (
    <div className="rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-5 space-y-4 shadow-[4px_4px_0_0_var(--color-panda-ink)] dark:shadow-none">
      <div className="flex items-center justify-between gap-3">
        <code className="text-lg sm:text-xl font-semibold text-panda-ink dark:text-panda-paper break-all">
          {address}
        </code>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleCopy}
          className="rounded-full bg-panda-red hover:bg-panda-red-dark text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          {copied ? "Copiado! ✓" : "Copiar endereço"}
        </button>
        <button
          onClick={handleNewAddressClick}
          className="rounded-full border-2 border-panda-ink dark:border-white/30 text-panda-ink dark:text-panda-paper text-sm font-semibold px-4 py-2 hover:bg-panda-cream dark:hover:bg-white/10 transition-colors"
        >
          Novo endereço
        </button>
        <button
          onClick={() => setDeleteConfirmOpen(true)}
          className="rounded-full border-2 border-panda-red/40 text-panda-red text-sm font-semibold px-4 py-2 hover:bg-panda-red/10 transition-colors"
        >
          Apagar e-mail
        </button>
        <span className="ml-auto text-xs font-mono text-panda-gray dark:text-white/40">
          expira em {formatClock(secondsLeft)}
        </span>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Trocar de endereço?"
        description="Isso apaga os e-mails atuais dessa caixa de entrada. Essa ação não pode ser desfeita."
        confirmLabel="Trocar mesmo assim"
        cancelLabel="Cancelar"
        onConfirm={confirmNewAddress}
        onCancel={() => setConfirmOpen(false)}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Apagar este e-mail?"
        description="Isso apaga o endereço atual e todas as mensagens. Você volta pra tela inicial e pode criar um endereço personalizado ou sortear um novo."
        confirmLabel="Apagar e voltar"
        cancelLabel="Cancelar"
        onConfirm={confirmDeleteAddress}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
