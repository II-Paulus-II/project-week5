#!/bin/bash

echo "Making Project for Kayleigh - Your Project Folder is called \"group_project\""
mkdir group_project
cd group_project
touch .gitignore 
echo "node_modules/" >> .gitignore
echo "dist" >> .gitignore
echo "database.db" >> .gitignore
echo ".gitignore" >> .gitignore
echo "gswitch.sh" >> .gitignore
touch gswitch.sh
echo "#!/bin/bash" >> gswitch.sh
echo "git switch kayleigh" >> gswitch.sh
git init
git branch -M main
git remote add origin git@github.com:II-Paulus-II/project-week5.git
git pull origin main
git checkout -b paulus
git checkout -b eric
git checkout -b kayleigh
git checkout -b thomas
chmod +x gswitch.sh
./gswitch.sh
cd client
npm install
cd ../server 
npm install
cd ..
echo "Project ready for Work"
code .
