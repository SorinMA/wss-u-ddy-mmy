FROM tensorflow/tensorflow


# e bine sa setam un workdir
# pentru ca nu vrem sa suprascriem
# ceva din filesystemul imaginii de baza
WORKDIR /numeWSDApp

# copiem mai intai fisierul cu dependecy uri 
# pentru a evita buildurile nenecesare
COPY ./req.txt .


# instala dependecy urile
RUN pip install -r req.txt

# copiem tot codul
COPY . .    

CMD ["python", "api.py"]