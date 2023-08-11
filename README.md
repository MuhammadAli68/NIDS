# NIDS
A POC of NIDS system (development + deployment)
download data set from https://drive.google.com/file/d/1Kxhy40FJBqTi0D6g9CpmBEx1jHOqu0Zs/view?usp=share_link
rand_forest.pkl is the trained random forest model with 6 features taken from the CICIDS2017 data set.

# Code Insights
<p>An expressjs GET api included within the 'NIDS.js' file runs the childProcess.py file upon every request
  and passes a randomly generated index as an argument. The index is used to fetch a record from the 'threats.csv'
  file to get a prediction from the random forest classifier. The 'childProcess.py' returns a json output to the
  expressjs api. The json includes the prediction probabilites for each type of cyber attack, depending on the received
  packet. The received json is also the output of the express api.
</p>

# Output
<p style=background-color:#808080>
  **The output following is the output of NIDS.js** 
  {
    "packet_number": 83351,
    "packet": {
        "Flow Duration": 91585632,
        "Total Length of Bwd Packets": 11607,
        "Bwd Packet Length Max": 8675,
        "Bwd Packet Length Mean": 2321.4,
        "Flow IAT Std": 23900000,
        "Flow IAT Max": 86400000
    },
    "predictions": {
        "DDoS": 0.6843946242355766,
        "DoS": 0.3155013815567297,
        "PortScan": 0.00010399420769363517
    }
}
</p>

# Important Points
+ The code has been modified strictly run inside a ubuntu 20.04 docker container
+ The code requires the nodejs version 18 and python 3.9.x version to run
+ The nodejs modules are included within the repository so no need to download separately. They can be cloned directly from the repository.
+ The python dependancies are listed within the 'requirements.txt' file
+ No need to separately download threats.csv from google drive. The python code automatically downloads the file on the very first request
+ You can get the docker image from dokcer hub using the command 'docker pull dockerjuggy/my-nids-image:NIDStag'
+ Build container using the command "docker run -it --rm -p 5000:5000  my-nids-image"
+ After container starts running, you can send GET request on the link 'https://localhost:5000/NIDS'
