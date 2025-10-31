// ============================================================
// Descripción: Pantalla de "Mi cuenta" para editar perfil,
// cambiar contraseña y eliminar la cuenta.
// ============================================================

import React, { useContext, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/context/ToastContext";

const Cuenta = () => {
  // Tema actual (claro/oscuro) para aplicar estilos
  const { tema } = useContext(ModoOscuroContext);

  // Traigo datos y acciones del usuario desde el contexto
  const { user, updateProfile, changePassword, deleteAccount } = useUser();

  // Sistema de mensajes (toasts) para avisos al usuario
  const toast = useToast();

  // ------------------------------------------------------------
  // Estado local: edición de perfil (nombre e imagen)
  // Inicio con los datos del usuario si existen
  // ------------------------------------------------------------
  const [perfil, setPerfil] = useState({
    name: user?.name || "",
    image: user?.image || "",
  });

  // ------------------------------------------------------------
  // Estado local: cambio de contraseña
  // currentPassword: la actual
  // newPassword: la nueva
  // confirm: confirmación de la nueva
  // ------------------------------------------------------------
  const [pwd, setPwd] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });

  // ------------------------------------------------------------
  // Guardar cambios de perfil
  // Llama a updateProfile del contexto y muestra un toast
  // ------------------------------------------------------------
  const onSaveProfile = async (e) => {
    e.preventDefault();
    const err = await updateProfile(perfil);
    if (err) return toast.error(err);
    toast.success("Perfil actualizado");
  };

  // ------------------------------------------------------------
  // Cambiar contraseña
  // Verifico que la confirmación coincida antes de enviar
  // ------------------------------------------------------------
  const onChangePwd = async (e) => {
    e.preventDefault();
    if (pwd.newPassword !== pwd.confirm)
      return toast.error("Las contraseñas no coinciden");
    const err = await changePassword({
      currentPassword: pwd.currentPassword,
      newPassword: pwd.newPassword,
    });
    if (err) return toast.error(err);
    setPwd({ currentPassword: "", newPassword: "", confirm: "" });
    toast.success("Contraseña actualizada");
  };

  // ------------------------------------------------------------
  // Eliminar cuenta
  // Pido confirmación porque es una acción irreversible
  // ------------------------------------------------------------
  const onDelete = async () => {
    if (
      !confirm(
        "¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
      )
    )
      return;
    const err = await deleteAccount();
    if (err) return toast.error(err);
    toast.info("Cuenta eliminada");
  };

  // ------------------------------------------------------------
  // Render principal
  // Estructura: Header, contenido central y Footer
  // ------------------------------------------------------------
  return (
    <div className={`page-container ${tema}`}>
      <Header />
      <main className="form-center-container">
        <div className="form-box" style={{ maxWidth: 560 }}>
          <h2>Mi cuenta</h2>

          {/* -------- Formulario: Perfil (nombre e imagen) -------- */}
          <form onSubmit={onSaveProfile}>
            <label>Nombre</label>
            <input
              type="text"
              value={perfil.name}
              onChange={(e) => setPerfil({ ...perfil, name: e.target.value })}
              required
            />
            <label>Imagen (URL)</label>
            <input
              type="url"
              placeholder="https://..."
              value={perfil.image}
              onChange={(e) => setPerfil({ ...perfil, image: e.target.value })}
            />
            <button type="submit">Guardar perfil</button>
          </form>

          <hr className="my-6" />

          {/* -------- Formulario: Cambio de contraseña -------- */}
          <h3>Cambiar contraseña</h3>
          <form onSubmit={onChangePwd}>
            <label>Contraseña actual</label>
            <input
              type="password"
              value={pwd.currentPassword}
              onChange={(e) =>
                setPwd({ ...pwd, currentPassword: e.target.value })
              }
              required
            />
            <label>Nueva contraseña</label>
            <input
              type="password"
              value={pwd.newPassword}
              onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })}
              required
            />
            <label>Confirmar nueva contraseña</label>
            <input
              type="password"
              value={pwd.confirm}
              onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
              required
            />
            <button type="submit">Actualizar contraseña</button>
          </form>

          <hr className="my-6" />

          {/* -------- Acción: Eliminar cuenta -------- */}
          <button type="button" className="btn-danger" onClick={onDelete}>
            Eliminar cuenta
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cuenta;
