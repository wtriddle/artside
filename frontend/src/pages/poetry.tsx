import { NextPage } from "next";
import React from "react";
import { NavBar } from "../components/NavBar";

type PoetryPageProps = {};

const PoetryPage: NextPage<PoetryPageProps> = () => {
  return (
    <>
      <NavBar />
      <div>This will be the poetry feed</div>
    </>
  );
};

export default PoetryPage;
