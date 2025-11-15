# Documentación de Endpoints - API KICKS

## Endpoints de Autenticación

### 1. Registro de Usuario
**URL:** `/api/auth/register`  
**Método:** `POST`  
**Autenticación:** No requerida

**Body (JSON):**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Password1!"
}
```

**Validaciones:**
- Todos los campos son obligatorios
- Email debe tener formato válido
- Contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&)

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": 0
  }
}
```

**Errores posibles:**
- `400` - Campos faltantes o formato inválido
- `409` - Email ya está registrado
- `500` - Error del servidor

---

### 2. Login de Usuario
**URL:** `/api/auth/login`  
**Método:** `POST`  
**Autenticación:** No requerida

**Body (JSON):**
```json
{
  "email": "juan@example.com",
  "password": "Password1!"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Login exitoso",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "rol": 0
  }
}
```

**Nota:** El token JWT se envía como cookie httpOnly llamada `token` con duración de 1 hora.

**Errores posibles:**
- `400` - Campos faltantes
- `401` - Credenciales inválidas
- `403` - Usuario desactivado
- `500` - Error del servidor

---

### 3. Obtener Perfil de Usuario
**URL:** `/api/auth/perfil`  
**Método:** `GET`  
**Autenticación:** Requerida (Cookie httpOnly)

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "rol": 0
}
```

**Errores posibles:**
- `401` - Token inválido o faltante
- `404` - Usuario no encontrado
- `500` - Error del servidor

---

### 4. Actualizar Perfil de Usuario
**URL:** `/api/auth/perfil`  
**Método:** `PUT`  
**Autenticación:** Requerida (Cookie httpOnly)

**Body (JSON):**
```json
{
  "nombre": "Juan Pérez García",
  "email": "juan.nuevo@example.com"
}
```

**Validaciones:**
- Ambos campos son obligatorios
- Email debe tener formato válido
- Email no debe estar en uso por otro usuario

**Respuesta exitosa (200):**
```json
{
  "message": "Perfil actualizado exitosamente",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez García",
    "email": "juan.nuevo@example.com"
  }
}
```

**Errores posibles:**
- `400` - Campos faltantes o formato inválido
- `401` - Token inválido o faltante
- `404` - Usuario no encontrado
- `409` - Email ya está en uso
- `500` - Error del servidor

---

### 5. Cambiar Contraseña
**URL:** `/api/auth/cambiar-contraseña`  
**Método:** `PUT`  
**Autenticación:** Requerida (Cookie httpOnly)

**Body (JSON):**
```json
{
  "currentPassword": "Password1!",
  "newPassword": "NewPassword2@"
}
```

**Validaciones:**
- Ambos campos son obligatorios
- Nueva contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales

**Respuesta exitosa (200):**
```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

**Errores posibles:**
- `400` - Campos faltantes o formato de contraseña inválido
- `401` - Token inválido, faltante o contraseña actual incorrecta
- `404` - Usuario no encontrado
- `500` - Error del servidor

---

## Endpoints de Suscripción

### 1. Suscribirse al Newsletter
**URL:** `/api/suscripcion`  
**Método:** `POST`  
**Autenticación:** No requerida

**Body (JSON):**
```json
{
  "email": "usuario@example.com"
}
```

**Descripción:**  
Envía un correo de bienvenida con un cupón de descuento del 10% (DESCUENTO10) al email proporcionado.

**Respuesta exitosa (200):**
```json
{
  "message": "Correo de suscripción enviado exitosamente"
}
```

**Errores posibles:**
- `500` - Error al enviar el correo de suscripción

---

## Endpoints de Contacto

### 1. Enviar Mensaje de Contacto
**URL:** `/api/contact`  
**Método:** `POST`  
**Autenticación:** No requerida

**Body (JSON):**
```json
{
  "email": "usuario@example.com"
}
```

**Descripción:**  
Envía un correo de confirmación al usuario indicando que su mensaje fue recibido y que el equipo de KICKS se pondrá en contacto pronto.

**Respuesta exitosa (200):**
```json
{
  "message": "Contacto recibido. Nos pondremos en contacto contigo pronto."
}
```

**Nota:** Esta respuesta se envía inmediatamente sin esperar la confirmación del envío del correo.

---

## Notas Generales

### Autenticación con Cookies
Los endpoints protegidos requieren que el cliente envíe la cookie `token` (httpOnly) que se establece al hacer login. Esta cookie contiene el JWT con la siguiente estructura:

```json
{
  "userId": 1,
  "email": "usuario@example.com",
  "rol": 0,
  "iat": 1234567890,
  "exp": 1234571490
}
```

### Roles de Usuario
- `0` = Usuario normal
- `1` = Administrador

### Estados de Usuario
- `0` = Desactivado
- `1` = Activo

### Configuración CORS
La API acepta peticiones desde:
- `http://127.0.0.1:5500`
- `http://localhost:5500`

Con credenciales habilitadas para permitir el envío de cookies.
