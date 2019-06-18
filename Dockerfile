FROM python:3.7


RUN apt-get update && apt-get install -y vim
RUN pip install --upgrade pip
ADD requirements.txt /user/home/requirements.txt
RUN pip install -r /user/home/requirements.txt

###build steps
WORKDIR /usr/home

EXPOSE 8081 5000

ADD . /usr/home/

ENV PYTHONPATH="$PYTHONPATH:/usr/home"
ENV FLASK_APP="app.py"


RUN rm -rf .git Dockerfile README.md

### run steps
CMD python app.py
