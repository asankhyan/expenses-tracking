export default function Tags({tags, tagOnClick}){
    return(
        <div className="tags">
            {
                tags.map((tag, inx)=>{
                    return <Tag key={inx} text={tag} onClick={()=>{tagOnClick && tagOnClick(inx)}}/>;
                })
            }
        </div>
    );
}

function Tag({text, onClick}){
    return(
        <span onClick={onClick} style={{margin: "5px", backgroundColor: "#e1ddddab", padding: "5px 5px", cursor: "pointer"}}>{text}</span>
    );
}