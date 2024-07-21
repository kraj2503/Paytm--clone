/* eslint-disable react/prop-types */
export function Button({ label, onClick }) {
    return (
        <button onClick={onClick} type="button" className="bg-gray-800 hover:bg-gray-900  hover:cursor-pointer w-full  text-white py-2.5 px-5 rounded-lg font-medium text-sm focus:outline-none focus:ring-4 focus:ring-gray-300 me-2 mb-2 " >
            {label}
        </button>
    )
}