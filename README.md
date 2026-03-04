# Portfolio Personal - Pablo Macías

Portfolio profesional de Product Owner & Project Manager con arquitectura modular y datos separados.

## 📁 Estructura del Proyecto

```
home_personal/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS
├── app.js             # Funcionalidades (tema, menú, formulario, etc.)
├── data-loader.js     # Cargador de datos dinámico
├── data/              # Carpeta de datos en JSON
│   ├── profile.json   # Información personal y bio
│   ├── skills.json    # Habilidades técnicas y progress bars
│   ├── experience.json # Experiencia laboral
│   └── projects.json  # Proyectos destacados
└── README.md          # Este archivo
```

## 🎯 Características

- ✅ **Datos separados**: Toda la información personal está en archivos JSON independientes
- ✅ **Fácil de mantener**: Actualiza tus datos sin tocar el HTML
- ✅ **Modular**: CSS y JavaScript separados
- ✅ **Responsive**: Funciona en móvil, tablet y desktop
- ✅ **Dark/Light Mode**: Tema oscuro/claro con persistencia
- ✅ **SEO optimizado**: Meta tags dinámicos
- ✅ **Sin dependencias**: Vanilla JavaScript puro

## 📝 Cómo Actualizar tu Información

### 1. Perfil Personal (`data/profile.json`)

```json
{
  "name": "Tu Nombre",
  "role": "Tu Rol",
  "tagline": "Tu Tagline",
  "location": "Tu Ubicación",
  "bio": [
    "Párrafo 1 de tu biografía",
    "Párrafo 2...",
    "Párrafo 3..."
  ],
  "social": {
    "linkedin": "URL de LinkedIn",
    "github": "URL de GitHub",
    "email": "tu@email.com"
  }
}
```

### 2. Habilidades (`data/skills.json`)

```json
{
  "technical": [
    { "name": "Nombre Tool", "icon": "📊" }
  ],
  "progress": [
    {
      "name": "Nombre de la habilidad",
      "percentage": 95
    }
  ]
}
```

### 3. Experiencia (`data/experience.json`)

```json
[
  {
    "title": "Tu Puesto",
    "company": "Nombre Empresa",
    "period": "2023 - Presente",
    "achievements": [
      "Logro 1",
      "Logro 2"
    ]
  }
]
```

### 4. Proyectos (`data/projects.json`)

```json
[
  {
    "id": "proyecto-id",
    "title": "Título del Proyecto",
    "icon": "📊",
    "summary": "Resumen corto",
    "tags": ["Tag1", "Tag2"],
    "description": "Descripción larga para el modal",
    "details": [
      "Característica 1",
      "Característica 2"
    ],
    "tech": ["Tecnología 1", "Tecnología 2"],
    "impact": "Impacto del proyecto"
  }
]
```

## 🚀 Cómo Usar

### Desarrollo Local

1. Abre el archivo `index.html` directamente en tu navegador, O
2. Usa un servidor local (recomendado para evitar problemas con CORS):

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx http-server

# Con PHP
php -S localhost:8000
```

3. Abre `http://localhost:8000` en tu navegador

### Deploy

Puedes deployar fácilmente en:

- **GitHub Pages**: Sube todo el contenido a tu repositorio
- **Netlify**: Arrastra la carpeta al dashboard
- **Vercel**: Conecta tu repositorio de GitHub
- **Cualquier hosting estático**

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary: #0ea5e9;      /* Color principal */
    --secondary: #64748b;    /* Color secundario */
    --dark: #0f172a;         /* Color oscuro */
    --light: #f8fafc;        /* Color claro */
}
```

### Agregar Nuevas Secciones

1. Añade la sección en `index.html`
2. Crea el archivo JSON correspondiente en `data/`
3. Actualiza `data-loader.js` para cargar y renderizar los nuevos datos

## 🔧 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript ES6+**: Modules, Fetch API, async/await
- **JSON**: Almacenamiento de datos

## 📱 Compatibilidad

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ Mobile browsers

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de usarlo como inspiración para tu propio portfolio.

---

**Hecho con ❤️ en A Coruña, España**
