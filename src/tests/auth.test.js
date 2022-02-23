import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

import Login from "../pages/Login";
import Search from "../pages/Search";

import { BrowserRouter } from "react-router-dom";

import { Simulate } from "react-dom/test-utils";

import mockAxios from "jest-mock-axios";
import { login, searchRecipes } from "../API/actions";

describe("Login process", () => {
  test("Empty email input should show error message", () => {
    const { getByLabelText, getByText, getByTitle } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInputNode = getByLabelText("Email address");
    const submitButtonNode = getByTitle("login-btn");
    fireEvent.change(emailInputNode, { target: { value: "" } });

    Simulate.click(submitButtonNode);
    const errorMessageNode = getByText("Please provide a valid email.");
    expect(errorMessageNode).toBeInTheDocument();

    fireEvent.change(emailInputNode, {
      target: { value: "challenge@alkemy.org" },
    });
    expect(emailInputNode.value).toMatch("challenge@alkemy.org");
    expect(errorMessageNode).not.toBeInTheDocument();
  });

  test("Empty password input should show error message", () => {
    const { getByLabelText, getByText, getByTitle } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const passwordInputNode = getByLabelText("Password");
    const submitButtonNode = getByTitle("login-btn");

    fireEvent.change(passwordInputNode, { target: { value: "" } });
    Simulate.click(submitButtonNode);
    const errorMessageNode = getByText("Please provide a password.");
    expect(errorMessageNode).toBeInTheDocument();

    fireEvent.change(passwordInputNode, {
      target: { value: "react" },
    });
    expect(passwordInputNode.value).toMatch("react");
    expect(errorMessageNode).not.toBeInTheDocument();
  });

  test("Must provide valid email", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInputNode = getByLabelText("Email address");
    fireEvent.change(emailInputNode, {
      target: { value: "challenge@alkemy.org" },
    });
    expect(emailInputNode.value).toBe("challenge@alkemy.org");
  });

  test("Must provide valid password", () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const passwordInputNode = getByLabelText("Password");
    fireEvent.change(passwordInputNode, { target: { value: "react" } });
    expect(passwordInputNode.value).toBe("react");
  });

  test("Logs in with proper credentials", async () => {
    const email = "challenge@alkemy.org";
    const password = "react";
    const response = await login(email, password);

    expect(mockAxios.post).toHaveBeenCalledWith(
      "http://challenge-react.alkemy.org/",
      {
        email,
        password,
      }
    );
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ success: true });
  });

  test("Fails to log in with wrong credentials", async () => {
    const email = "wrongemail@test.com";
    const password = "wrongpassword";
    const response = await login(email, password);

    expect(mockAxios.post).toHaveBeenCalledWith(
      "http://challenge-react.alkemy.org/",
      {
        email,
        password,
      }
    );

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ success: false });
  });

  describe("Searching for a dish", () => {
    test("Search bar should be present in document", () => {
      const { getByText, getByPlaceholderText } = render(
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      );

      const searchInput = getByPlaceholderText("Search for a dish...");
      const submitButton = getByText("Submit");

      expect(searchInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });
});
