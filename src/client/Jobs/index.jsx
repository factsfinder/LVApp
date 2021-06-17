import React, { useEffect, useState } from "react";
import JobItem from "./JobItem";
import SearchBar from "./SearchBar";
import "./jobs.css";
import CheckBox from "./checkbox";

function Jobs() {
  const [jobItems, setJObItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [checkboxes, setCheckboxes] = useState([
    {
      checked: false,
      label: "Part-Time",
      name: "part",
      index: 0,
    },
    {
      checked: false,
      label: "Full-Time",
      name: "full",
      index: 1,
    },
    {
      checked: false,
      label: "Freelance",
      name: "freelance",
      index: 2,
    },
  ]);

  const jobItemsToShow = searchText.length > 0 ? searchItems : jobItems; // naming can be better.

  useEffect(() => {
    fetch("/api/getJobs")
      .then((res) => res.json())
      .then((jobsRes) => setJObItems(jobsRes.jobs))
      .catch((err) => console.log("job items fetch err", err));
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      const isPartTimeChecked =
        checkboxes.find((c) => c.name === "part").checked === true;
      const isFreelancerChecked =
        checkboxes.find((c) => c.name === "freelance").checked === true;
      const isFullTimeChecked =
        checkboxes.find((c) => c.name === "full").checked === true;
      // Todo: debounce this
      fetch(
        `/api/searchJobs?searchText=${searchText}&partTime=${isPartTimeChecked}&freelance=${isFreelancerChecked}&fullTime=${isFullTimeChecked}`
      )
        .then((res) => res.json())
        .then((jobsRes) => {
          console.log("checkig items from fetch: ", jobsRes);
          setSearchItems(jobsRes.jobs);
        })
        .catch((err) => console.log("search fetch err", err));
    }
  }, [searchText]);

  const handleChangeCheckBoxs = (e) => {
    const updated = checkboxes.map((c) => {
      if (c.name === e.target.name) {
        return { ...c, checked: !c.checked };
      }
      return c;
    });
    setCheckboxes(updated);
  };

  console.log("job items and search: ", jobItemsToShow, searchText);
  return (
    <div>
      <div class="row">
        <SearchBar onChange={setSearchText} />
        {checkboxes.map((c) => (
          <CheckBox
            key={c.name}
            label={c.label}
            isChecked={c.checked}
            name={c.name}
            handleToggle={handleChangeCheckBoxs}
          />
        ))}
      </div>
      {jobItemsToShow.map((j) => {
        return <JobItem {...j} key={j._id} />;
      })}
    </div>
  );
}

export default Jobs;
