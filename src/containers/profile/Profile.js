import React, {useState, useEffect, lazy, Suspense} from "react";
import {projects} from "../../portfolio";
import Contact from "../contact/Contact";
import Loading from "../loading/Loading";

const renderLoader = () => <Loading />;
const GithubProfileCard = lazy(() =>
  import("../../components/githubProfileCard/GithubProfileCard")
);
export default function Profile() {
  const [prof, setrepo] = useState([]);
  function setProfileFunction(array) {
    setrepo(array);
  }

  useEffect(() => {
    if (projects.showGithubProfile === "true") {
      const getProfileData = () => {
        fetch("/profile.json")
          .then(result => {
            if (result.ok) {
              return result.json();
            }
          })
          .then(response => {
            setProfileFunction(response.data.user);
          })
          .catch(function (error) {
            console.error(
              `${error} (because of this error GitHub contact section could not be displayed. Contact section has reverted to default)`
            );
            setProfileFunction("Error");
            projects.showGithubProfile = "false";
          });
      };
      getProfileData();
    }
  }, []);
  if (
    projects.display &&
    projects.showGithubProfile === "true" &&
    !(typeof prof === "string" || prof instanceof String)
  ) {
    return (
      <Suspense fallback={renderLoader()}>
        <GithubProfileCard prof={prof} key={prof.id} />
      </Suspense>
    );
  } else {
    return <Contact />;
  }
}
