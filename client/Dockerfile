# alegem (base img) imaginea pe care vrem sa o folosim
# in functie de ce vrem sa rulam in container
FROM node:alpine as buildIMG
# aceasta imagine este taguita ca buildIMG
# pentru a fi folosita mai tarziu

# e bine sa setam un workdir
# pentru ca nu vrem sa suprascriem
# ceva din filesystemul imaginii de baza
WORKDIR /clientWSD

# copiem mai intai fisierul cu dependecy uri 
# pentru a evita buildurile nenecesare
COPY ./package.json . 

# instala dependecy urile
RUN npm install

# copiem tot codul
COPY . .

# rulam comanda 
# npm run build pentru ca acest container
# pentru a genera codul de productie pentru
# aplicatia de react
RUN npm run build

# urmeaza a doua parte,
# setarea unui web server
# pentru a manevra traficul la codul nostru 

# recomand nginx
FROM nginx

# expunem un port
EXPOSE 3000
# pas important pentru rularea pe AWS ElasticB
# dar care poate fi ignorat daca nu e neapart nevoie

# copiem config fileul pentru 
# a sti nginx cum sa faca rutarea

COPY ./nginxForClient/default.conf /etc/nginx/conf.d/default.conf

# aici este nevoie de tagul de la inceput
# pentru a sti docker din filesystemul carui
# container sa copieze fisierele

COPY --from=buildIMG /clientWSD/build /usr/share/nginx/html