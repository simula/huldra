import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Survey from "./major-components/survey";
import Warning from "./major-components/warning";
import { fetchConfigVariablesBatch } from "./utils/handleConfigVars";
const App = () => {
  const [innerWidth] = useState(window.innerWidth);
  const [configuration, setConfiguration] = useState({});
  useEffect(() => {
    setConfiguration(
      fetchConfigVariablesBatch([
        "REACT_APP_home",
        "REACT_APP_warning",
        "REACT_APP_background",
        "REACT_APP_demonstration",
        "REACT_APP_registration",
        "REACT_APP_caseImage",
        "REACT_APP_caseVideo",
        "REACT_APP_caseAudio",
        "REACT_APP_summaryAndFeedback",
        "REACT_APP_end",
        "REACT_APP_survey",
        "REACT_APP_outputJson",
        "REACT_APP_footer",
        "REACT_APP_header",
        "REACT_APP_caseHybrid",
        "REACT_APP_caseOrder",
      ])
    );
    function handleResize() {}
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <div className="App">
      {innerWidth < 1200 ? (
        <Warning REACT_APP_warning={configuration["REACT_APP_warning"]} />
      ) : (
        <Switch>
          <Route
            path="/survey/home"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_home={configuration["REACT_APP_home"]}
                REACT_APP_outputJson={configuration["REACT_APP_outputJson"]}
                REACT_APP_footer={configuration["REACT_APP_footer"]}
                REACT_APP_header={configuration["REACT_APP_header"]}
              />
            )}
          />
          <Route
            path="/survey/registration"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_caseOrder={configuration["REACT_APP_caseOrder"]}
                REACT_APP_registration={configuration["REACT_APP_registration"]}
                REACT_APP_outputJson={configuration["REACT_APP_outputJson"]}
                REACT_APP_footer={configuration["REACT_APP_footer"]}
                REACT_APP_header={configuration["REACT_APP_header"]}
              />
            )}
          />
          <Route
            path="/survey/background"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_background={configuration["REACT_APP_background"]}
                REACT_APP_demonstration={
                  configuration["REACT_APP_demonstration"]
                }
                REACT_APP_footer={configuration["REACT_APP_footer"]}
                REACT_APP_header={configuration["REACT_APP_header"]}
              />
            )}
          />
          <Route
            path="/survey/demonstration"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_demonstration={
                  configuration["REACT_APP_demonstration"]
                }
                REACT_APP_footer={configuration["REACT_APP_footer"]}
                REACT_APP_header={configuration["REACT_APP_header"]}
              />
            )}
          />
          <Route
            path="/survey/case:id"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_caseImage={configuration["REACT_APP_caseImage"]}
                REACT_APP_caseVideo={configuration["REACT_APP_caseVideo"]}
                REACT_APP_caseAudio={configuration["REACT_APP_caseAudio"]}
                REACT_APP_caseHybrid={configuration["REACT_APP_caseHybrid"]}
                REACT_APP_outputJson={configuration["REACT_APP_outputJson"]}
                REACT_APP_demonstration={
                  configuration["REACT_APP_demonstration"]
                }
                REACT_APP_footer={configuration["REACT_APP_footer"]}
                REACT_APP_header={configuration["REACT_APP_header"]}
              />
            )}
          />
          <Route
            path="/survey/summary-and-feedback"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_summaryAndFeedback={
                  configuration["REACT_APP_summaryAndFeedback"]
                }
                REACT_APP_outputJson={configuration}
                REACT_APP_footer={configuration["REACT_APP_footer"]}
                REACT_APP_header={configuration["REACT_APP_header"]}
              />
            )}
          />
          <Route
            path="/survey/end"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_end={configuration["REACT_APP_end"]}
                REACT_APP_footer={configuration["REACT_APP_footer"]}
              />
            )}
          />
          <Redirect from="/" to="/survey/home" />
        </Switch>
      )}
    </div>
  );
};
export default App;
