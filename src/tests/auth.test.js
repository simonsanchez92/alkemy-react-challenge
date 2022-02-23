import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Login";
import { validateEmail } from "../pages/Login";
import { BrowserRouter } from "react-router-dom";

import { Simulate } from "react-dom/test-utils";

import Enzyme, { mount } from "enzyme";

import mockAxios from "jest-mock-axios";
import { login } from "../API/actions";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

describe("Login fields on submit", () => {
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

  //   test("Validate function should pass on correct input", () => {
  //     const text = "text@test.com";

  //     expect(validateEmail("test")).toBe(true);
  //   });

  //   test("Validate function should fail on incorrect input", () => {
  //     expect(validateEmail("lala")).not.toBe(true);
  //   });

  //   test("Login form should be present in document", () => {
  //     const component = render(
  //       <BrowserRouter>
  //         <Login />
  //       </BrowserRouter>
  //     );
  //     const labelNode = component.getByText("Email address");

  //     expect(labelNode).toBeInTheDocument();
  //   });

  //   test("Email field should have label", () => {
  //     const component = render(
  //       <BrowserRouter>
  //         <Login />
  //       </BrowserRouter>
  //     );
  //     const emailInputNode = component.getByLabelText("Email address");
  //     expect(emailInputNode.getAttribute("name")).toBe("email");
  //   });
});

// test("render page", () => {
//   const component = render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>
//   );

//   console.log(component);
// });
