const Input = ({ label, state,setState ,type='text'}) => {
  return (
    <div>
      <div className="form-floating">
        <input
          value={state}
          type={type}
          onChange={(e) => setState(e.target.value)}
          className="form-control"
          id="floatingInput"
          placeholder={label}
        />
        <label htmlFor="floatingInput">{label}</label>
      </div>
    </div>
  );
};

export default Input;
