import React, { useEffect, useState } from "react";
import JobItem from "./JobItem";
import SearchBar from "./SearchBar";
import "./jobs.css";
import CheckBox from "./checkbox";

function Jobs() {
  const [jobItems, setJObItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isPartTimeChecked, setIsPartTimeChecked] = useState(false);
  const [isFullTimeChecked, setIsFullTimeChecked] = useState(true);
  const [isFreelancerChecked, setIsFreelancerChecked] = useState(false);

  const jobItemsToShow = searchText.length > 0 ? searchItems : jobItems; // naming can be better.

  useEffect(() => {
    fetch("/api/getJobs")
      .then((res) => res.json())
      .then((jobsRes) => setJObItems(jobsRes.jobs))
      .catch((err) => console.log("job items fetch err", err));
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      // Todo: debounce this
      fetch(
        `/api/searchJobs?searchText=${searchText}&partTime=${isPartTimeChecked}&freelancer=${isFreelancerChecked}`
      )
        .then((res) => res.json())
        .then((jobsRes) => {
          console.log("checkig items from fetch: ", jobsRes);
          setSearchItems(jobsRes.jobs);
        })
        .catch((err) => console.log("search fetch err", err));
    }
  }, [searchText]);

  const handleChangeCheckBox = (e) => {};

  console.log("job items and search: ", jobItemsToShow, searchText);
  return (
    <div>
      <div class="row">
        <SearchBar onChange={setSearchText} />
        <CheckBox label="Full-Time" isChecked={isFullTimeChecked} name="full" />
        <CheckBox label="Part-Time" isChecked={isPartTimeChecked} name="part" />
        <CheckBox
          label="Freelancer"
          isChecked={isFreelancerChecked}
          name="freelance"
        />
      </div>
      {jobItemsToShow.map((j) => {
        return <JobItem {...j} />;
      })}
    </div>
  );
}

export default Jobs;
