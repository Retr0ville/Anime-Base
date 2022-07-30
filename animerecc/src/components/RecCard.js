import React from "react";

const RecCard = (props) => {
  return (
    <div className="card" style={{ backgroundColor: "black" }}>
      <a href={props.animeUrl} className="image">
        <img alt="poster" src={props.imgUrl} />
      </a>
      <div className="content">
        <a className="header ani-title" href={props.animeUrl}>
          {props.animeTitle}
        </a>
        <a href={props.vidUrl} className="ui button red">
          Watch now
        </a>

        <div style={{}}>
          <div className="meta">
            <div className="date" align="right">
              Air date:{" "}
              {props.fromDate === null
                ? ""
                : "from " + props.fromDate?.slice(0, 7)}
              {props.toDate === null ? "" : ", to " + props.toDate?.slice(0, 7)}
            </div>
          </div>
          <div className="extra content right floated" align="right">
            <div className="flex-column">
              <div className="ui left labeled button total" tabindex="0">
                <div className="ui basic black right pointing label">Total Episodes</div>
                <div
                  className="ui black button"
                  style={{
                    height: 23,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="blue film icon"></i> {props.totalEpis}
                </div>
              </div>
              <div className="ui left labeled button seen" tabindex="0">
                <div className="ui basic black right pointing label">Seen Episodes</div>
                <div
                  className="ui black button"
                  style={{
                    height: 23,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="violet find icon"></i> {props.seenEpis}
                </div>
              </div>
              <div className="ui left labeled button rate" tabindex="0">
                <div className="ui basic black right pointing label">Rating</div>
                <div
                  className="ui black button"
                  style={{
                    height: "23px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="purple gratipay icon"></i> {props.rating}
                </div>
              </div>
              <div className="ui left labeled button score" tabindex="0">
                <div className="ui basic black right pointing label">Score</div>
                <div
                  className="ui black button"
                  style={{
                    height: 23,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="pink fire icon"></i> {props.score === 0 ? "ungraded" : props.score}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecCard;
