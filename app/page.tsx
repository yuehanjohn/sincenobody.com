"use client";
import React from "react";
import { Input, Button, Textarea } from "@heroui/react";

import { createClient } from "@/utils/supabase/client";
import ShinyText from "@/components/text/shinytext";

export default function TestPage() {
  const [code, setCode] = React.useState("");
  const [exist, setExist] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [joinError, setJoinError] = React.useState(false);
  const [followup, setFollowup] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedExist = localStorage.getItem("exist");
      const storedCode = localStorage.getItem("code");
      const storedFollowup = localStorage.getItem("followup");
      const storedEmail = localStorage.getItem("email");
      const storedName = localStorage.getItem("name");
      const storedAnswer = localStorage.getItem("answer");

      if (storedExist === "true") {
        setExist(true);
      }
      if (storedCode) {
        setCode(storedCode);
      }
      if (storedFollowup === "true") {
        setFollowup(true);
      }
      if (storedEmail) {
        setEmail(storedEmail);
      }
      if (storedName) {
        setName(storedName);
      }
      if (storedAnswer) {
        setAnswer(storedAnswer);
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  const checkCode = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("codes")
      .select("*")
      .eq("code", code.toString())
      .limit(1);

    if (error) {
      return;
    }

    if (data && data.length > 0) {
      setExist(true);
      setSubmitError(false);
      try {
        localStorage.setItem("exist", "true");
        localStorage.setItem("code", code.toString());
      } catch (e) {}
    } else {
      setExist(false);
      setSubmitError(true);
    }
  };

  const checkInput = async () => {
    if (!email || !name || !answer) {
      await setJoinError(true);
      return;
    } else {
      await setJoinError(false);
      return;
    }
  };

  const join = async () => {
    if (!email || !name || !answer) {
      setJoinError(true);
      return;
    } else {
      const supabase = await createClient();

      await supabase
        .from("registrations")
        .insert([{ email: email }, { name: name }, { answer: answer }]);

      setJoinError(false);
      setFollowup(true);

      try {
        localStorage.setItem("followup", "true");
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        localStorage.setItem("answer", answer);
      } catch (e) {}
    }
  };

  return (
    <>
      <div>
        <section className="section h-screen w-full relative flex">
          <div className="items-center justify-center m-auto text-center">
            <h1 className="text-foreground">
              Since Nobody is doing it, so we did
            </h1>
            <h1 className="text-foreground/50">
              <ShinyText
                disabled={false}
                speed={3}
                text="A community of doers, not dreamers."
              />
            </h1>
          </div>
        </section>
        <section className="section min-h-screen w-full relative flex">
          <div className="items-center justify-center m-auto text-center">
            {exist === false && (
              <>
                <h1 className="text-foreground mb-2">code</h1>

                <Input type="password" variant="flat" onValueChange={setCode} />
              </>
            )}

            <Button
              className="mt-2"
              variant="light"
              color={
                submitError ? "danger" : exist === true ? "success" : "default"
              }
              onPress={checkCode}
              isDisabled={exist === true}
            >
              {exist === true ? "welcome" : "submit"}
            </Button>
            {exist === true && followup === false && (
              <div className="flex flex-col gap-4 mt-4 w-full max-w-2xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col text-left">
                    <Input
                      id="email"
                      type="email"
                      variant="flat"
                      onValueChange={setEmail}
                      className="w-full"
                      placeholder="you@email.com"
                    />
                  </div>

                  <div className="flex flex-col text-left">
                    <Input
                      id="name"
                      type="text"
                      variant="flat"
                      onValueChange={setName}
                      className="w-full"
                      placeholder="First & last name"
                    />
                  </div>
                </div>

                <Textarea
                  className="w-full"
                  label="Answer"
                  placeholder="What specific, measurable action(s) have you taken in the last 30 days to move forward on your top 3 most important goals? Please list the goals and the exact steps you took."
                  onValueChange={setAnswer}
                />
                {joinError && (
                  <h1 className="text-danger">Please fill out all fields.</h1>
                )}

                <div className="flex justify-center">
                  <Button
                    className="mt-2 w-full sm:w-auto"
                    variant="light"
                    color={joinError === true ? "danger" : "default"}
                    onPress={() => {
                      join();
                    }}
                  >
                    Join
                  </Button>
                </div>
              </div>
            )}
            {followup === true && (
              <div className="mt-4">
                <p className="text-foreground">
                  We will follow up with you via email with next steps.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
