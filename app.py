from flask import Flask, render_template
from database import Database

app = Flask(__name__)


@app.route("/")
def send_activities():

    db = Database()
    acts = [dict(row._mapping) for row in db.activities()]

    return render_template('index.html', data=acts)


if __name__ == "__main__":

    app.run(debug=True)
    