@echo off
echo Installation de Instagram Auto Unlike...

:: Crée le dossier de l'extension
mkdir "%USERPROFILE%\instagram-auto-unlike" 2>nul

:: Copie les fichiers
copy manifest.json "%USERPROFILE%\instagram-auto-unlike\manifest.json" >nul
copy script.js "%USERPROFILE%\instagram-auto-unlike\script.js" >nul

echo.
echo Fichiers copiés !
echo.
echo Maintenant :
echo 1. Chrome va s'ouvrir sur la page des extensions
echo 2. Active le mode developpeur en haut a droite
echo 3. Clique sur "Charger l'extension non empaquetée"
echo 4. Selectionne le dossier : instagram-auto-unlike
echo.
pause

:: Ouvre Chrome sur la page des extensions
start chrome chrome://extensions

echo.
echo Une fois installée, va sur :
echo https://www.instagram.com/your_activity/interactions/likes
echo.
pause
