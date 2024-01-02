#!/bin/bash 

git switch main
git pull origin main
git switch paulus
git merge main
git push origin paulus
git switch eric
git merge main
git push origin eric
git switch kayleigh
git merge main
git push origin kayleigh
git switch thomas
git merge main
git push origin thomas
