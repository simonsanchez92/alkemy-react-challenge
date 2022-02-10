import React from "react";

const Spinner = ({ loading }) => {
  return (
    loading && (
      <div class="d-flex justify-content-center">
        <div class="spinner-border spinner-border-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  );
};

export default Spinner;
