import ProfileForm from "../../_components/form";


export default function Page(){
    return (
        <div className="flex  items-center flex-col ">
            <div >
               <h1 className="font-medium text-2xl"> Create your employee</h1>
            </div>
                <ProfileForm />
        </div>
        
    )
}