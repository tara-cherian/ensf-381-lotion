function Notes() {
  var noteList = [{
    id:1,
    name:"Overview",
    date: new date(),
    description: "This is the description"}
]  return (
  
    <>
      <div className="container">
        <div id="left-section"><header id="left-header"><h2>Notes</h2><button>+</button></header>
          <div id="notes-list">No Note Yet</div>
        </div>
        <div id="write-note"><h3>right section</h3></div>
      </div>

    </>
  )
}

export default Notes;