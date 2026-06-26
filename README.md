# LaSemo 2026 — Site du festival

Site **responsive** pour le festival éco-responsable **LaSemo** (parc d'Enghien, 10–12 juillet 2026).
Projet scolaire **EPSE**.

## Structure du projet
```
.
├── index.html · tickets.html · artiste.html
├── README.md
├── .gitignore
├── css/
│   └── style.css       
├── scss/
│   ├── base/          
│   ├── components/    
│   ├── layout/        
│   ├── pages/         
│   └── main.scss      
├── js/
│   └── main.js
└── assets/
    ├── img/   
    ├── fonts/ 
    └── icons/ 
```

## Compiler le SCSS
Sass est installé **globalement** sur la machine.

```bash
# Compiler une fois : watch.bat (auto)
sass scss/main.scss css/style.css --style=compressed --no-source-map

# Recompiler automatiquement (pendant le travail) : build.bat (compile)
sass --watch scss/main.scss:css/style.css --style=compressed
```



