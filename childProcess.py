import pickle
import pandas as pd
import sys
import json
import os
import gdown

rand_forest = pickle.load(open('rand_forest.pkl', 'rb'))
index = sys.argv[1]
index = int(index)

isExist = os.path.exists('threats.csv')
if(isExist == False):
    gdown.download('https://drive.google.com/uc?export=download&id=1Kxhy40FJBqTi0D6g9CpmBEx1jHOqu0Zs',output='threats.csv',quiet=False)

def randforest(index):
    threats = pd.read_csv('threats.csv')
    prediction_row = threats.loc[index,['Flow Duration','Total Length of Bwd Packets','Bwd Packet Length Max','Bwd Packet Length Mean','Flow IAT Std', 'Flow IAT Max']]
    #prediction_row = prediction_row.to_frame().T
    pred_probs = rand_forest.predict_proba(prediction_row.to_frame().T)
    return pred_probs[0],prediction_row.to_dict()

values,packet_dict = randforest(index)
pred_dict = {"DDoS":values[0],"DoS":values[1],"PortScan":values[2]}
final_dict = {"packet_number":index,"packet":packet_dict,"predictions":pred_dict}
sys.stdout.write(json.dumps(final_dict))
