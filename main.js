
document.getElementById('issueInputForm').addEventListener("submit",saveIssues);

function saveIssues(e){
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueIdentifier = chance.guid();
    var issueStatus = "open";
    var issue={
     id : issueIdentifier,
     desc: issueDesc,
     severity: issueSeverity,
     assignedTo: issueAssignedTo,
     status : issueStatus 
    }
    
    if(localStorage.getItem('issues')==null){
        var issues =[];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }else{
       var issues = JSON.parse(localStorage.getItem('issues'));
       issues.push(issue);
       localStorage.setItem('issues',JSON.stringify(issues));   
    }
    document.getElementById('issueInputForm').reset();
    e.preventDefault();
    
    fetchIssues();
}

function fetchIssues(){
    
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = "";
    for(var i=0; i< issues.length; i++){
        var id  = issues[i].id;
        var desc  = issues[i].desc;
        var assignedTo  = issues[i].assignedTo;
        var severity  = issues[i].severity;
        var status  = issues[i].status;
        issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                                                             
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning" id="close">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
      }
}

function setStatusClosed(id){

   var issue = JSON.parse(localStorage.getItem('issues'));
   for(var i=0; i< issue.length; i++){
     if(issue[i].id == id){
         issue[i].status = "closed"
     }
   }
   
   localStorage.setItem('issues', JSON.stringify(issue));
   fetchIssues();
  
}



function deleteIssue(id){

    var issue = JSON.parse(localStorage.getItem('issues'));
    for(var i=0; i< issue.length; i++){
      if(issue[i].id == id){
         issue.splice(i,1);
      }
    }
    console.log(issue);
    localStorage.setItem('issues', JSON.stringify(issue));
    fetchIssues();
   
 }