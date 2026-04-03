from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os
import json


load_dotenv("Nest.env")

class Database: 
    
    def __init__(self):

        self.user = os.getenv("user")
        self.password = os.getenv("password")
        self.host = os.getenv("host")
        self.port = os.getenv("port")
        self.dbname = os.getenv("dbname")
        self.connection = None

    def connect(self):

        if self.connection:
            return self.connection
        
        DATABASE_URL = f"postgresql+psycopg2://{self.user}:{self.password}@{self.host}:{self.port}/{self.dbname}?sslmode=require"
        engine = create_engine(DATABASE_URL)

        try:
            self.connection = engine.connect()
            return self.connection
        
        except Exception as e:
            print(f"Failed to connect: {e}")

    
    def activities(self):

        conn = self.connect()

        resp = conn.execute(text("""SELECT * FROM attivita"""))    
        result = resp.fetchall()

        return result
    


if __name__ == "__main__":
 
    db = Database()
    activities = db.activities()

    activities = [dict(row._mapping) for row in activities]
    print(activities)

    # acts = json.dumps(activities, indent=2)

    # print(acts)




# acts = json.loads(activities)
# print(acts)