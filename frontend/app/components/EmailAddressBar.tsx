import { useState } from "react";
import { useNavigate } from "react-router";
import { ConfirmDialog } from "./ConfirmDialog";
import { formatClock } from "../lib/format";
import { useMail } from "../hooks/MailContext";
import { Button } from "./ui/button";

export function EmailAddressBar() {
  const {
    address,
    secondsLeft,
    copied,
    handleCopy,
    randomAddress,
    clearAddress,
  } = useMail();
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
    navigate("/email-temporario/");
  }

  return (
    <div className="rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-5 space-y-4 shadow-[4px_4px_0_0_var(--color-panda-ink)] dark:shadow-none">
      <div className="flex items-center justify-between gap-3">
        <code className="text-lg sm:text-xl font-semibold text-panda-ink dark:text-panda-paper break-all">
          {address}
        </code>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button onPress={handleCopy}>
          {copied ? "Copiado! ✓" : "Copiar endereço"}
        </Button>
        <Button
          variant="outline"
          onPress={handleNewAddressClick}
          className="rounded-full border-2 border-panda-ink bg-transparent text-panda-ink hover:bg-panda-cream dark:border-white/30 dark:text-panda-paper dark:hover:bg-white/10"
        >
          Novo endereço
        </Button>
        <Button
          variant="destructive"
          onPress={() => setDeleteConfirmOpen(true)}
          className="rounded-full"
        >
          Apagar e-mail
        </Button>
        <span className="ml-auto text-xs font-mono text-panda-gray dark:text-white/50">
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
