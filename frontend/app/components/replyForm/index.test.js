/**
 * @jest-environment jsdom
 */

import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import ReplyForm from ".";

describe("Reply Form", () => {
  it("renders", () => {
    render(
      <ReplyForm
        id={1}
        setRepliesData={jest.fn()}
        isMessageOpenedProps={jest.fn()}
        setSuccess={jest.fn()}
      />
    );
  });
});
