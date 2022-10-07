import PageLayout from "@components/Layout/PageLayout";
import { Button, Divider, TextField } from "@mui/material";
import Image from "next/image";
import React from "react";
import type { PageProps } from "types/PageProps";
import { isAuthenticated } from "util/isAuthenticated";

const New = ({ isAuthenticated }: PageProps) => {

  return (
    <PageLayout className="flex flex-col" isAuthenticated={isAuthenticated}>
      <div>
        <img className="h-44 lg:h-56 w-full" src="/img/new.png" />
      </div>

      <div className="bg-slate-200 p-3 flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-4 flex-1 lg:flex-grow-0">
          <TextField InputProps={{
            sx: {
              "& input::placeholder": {
                fontStyle: "italic",
                fontSize: "1.3rem"
              }
            }
          }} type="text" placeholder="Title" label="Name your post!" fullWidth variant="filled" />

          <TextField InputProps={{
            sx: {
              "& textArea::placeholder": {
                fontStyle: "italic"
              }
            }
          }} placeholder="Your text here..." label="Write your post with markup!" variant="filled" fullWidth multiline minRows={10} />
        </div>

        <div className="flex justify-center">
          <div className="w-[80%] md:w-[50%] lg:w-[30%]">
            <Button style={{ backgroundColor: "#4F46E5" }} fullWidth variant="contained">
              <span className="text-xl">Post!</span>
            </Button>
          </div>
        </div>


      </div>
    </PageLayout>
  )
}

export const getServerSideProps = isAuthenticated();
export default New;