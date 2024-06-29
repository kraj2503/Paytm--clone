export function InputBox({ label, placeholder, onChange, type}) {
    return <div>
        <div className="text-sm font-medium text-left py-2 ">
            {label}
        </div>
        <input placeholder={placeholder} onChange={onChange} type={type} className="w-full px-2 py-1 border border-slate-200 rounded-md"/>
    </div>
}