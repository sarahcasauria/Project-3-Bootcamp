from pymongo import MongoClient
from flask import Flask
from flask import render_template
from bson import json_util
import pandas
import json
#Specify string names inside '' for following variables
MONGODB_HOST = 'mongodb+srv://<username>:<password>@cluster0.tqb6ya2.mongodb.net'
DBS_NAME = 'myFirstDatabase'
COLLECTION_NAME = 'platform_summary'
#Specify numerical variable (default used)
MONGODB_PORT = 27017

#Specify variables in csv of interest
FIELDS = {'_id': False, 'Platform': True, 'Year_of_Release_min': True,'Year_of_Release_max': True, 'NA_Sales_mean': True,'EU_Sales_mean': True,'JP_Sales_mean': True,'Other_Sales_mean': True,'Global_Sales_mean': True, 'Critic_Score_mean': True,'User_Score_mean': True,'E_Rating_sum': True,'M_Rating_sum': True,'T_Rating_sum': True,'E10+_Rating_sum': True,'AO_Rating_sum': True,'K-A_Rating_sum': True,'RP_Rating_sum': True,'Sports_Genre_sum': True,'Racing_Genre_sum': True,'Platform_Genre_sum': True,'Misc_Genre_sum': True,'Action_Genre_sum': True,'Shooter_Genre_sum': True,'Puzzle_Genre_sum': True,'Fighting_Genre_sum': True,'Simulation_Genre_sum': True,'Role-Playing_Genre_sum': True,'Adventure_Genre_sum': True,'Strategy_Genre_sum': True}

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/visualisation")
def visualisation():

    connection = MongoClient('mongodb+srv://<username>:<password>@cluster0.tqb6ya2.mongodb.net', 27017)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=100000)
    #projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

if __name__ == "__main__":
    app.run(debug=True)