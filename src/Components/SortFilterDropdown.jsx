
const SortFilterDropdown = ({ selectFunction, value, data }) => {
    return (
        <>
            <div className="sort-filter">
                <select
                    className="select-box"
                    onChange={(e) => {
                        selectFunction(e.target.value);
                    }}
                    name="sort"
                    value={value}
                >
                    {data.map((item) => (
                        <option value={item.value}>{item.text}</option>
                    ))}
                </select>
            </div>
        </>
    );
}
export default SortFilterDropdown;