# 🎾 Club de Tenis – Sistema de Reservas (React + Slim API)

Aplicación desarrollada como **Práctica N°2 del Seminario de Lenguaje – PHP 2025**, que implementa un **front-end en React** para consumir los datos de una **API RESTful creada con Slim (PHP)** durante la Práctica 1.

---

## 📋 Descripción general

El proyecto consiste en un **sistema de reservas de canchas de tenis**, donde los usuarios pueden:

- Visualizar las reservas del día en una grilla horaria.
- Registrarse, iniciar sesión y cerrar sesión.
- Consultar la información de las canchas.
- Realizar y gestionar reservas (según permisos).
- Administrar usuarios (solo administradores).

La aplicación consume los endpoints del backend PHP mediante **Axios**, manejando la autenticación a través de un **token** guardado en `localStorage`.

---

## 🧩 Tecnologías utilizadas

### Front-end

- **React 18** con **Vite**
- **Axios** para llamadas HTTP
- **React Router DOM** para la navegación
- **date-fns** para manejo de fechas
- **Material Icons (Google Fonts)** para íconos
- **CSS modular** para estilos simples y responsivos

### Back-end (desde Práctica 1)

- **Slim Framework (PHP)**
- **MySQL** y **phpMyAdmin** (Docker)
- **JWT / Tokens** para autenticación
- **Rutas RESTful** (`/login`, `/logout`, `/users`, `/courts`, `/booking`, etc.)

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repo>
cd tenis
```
