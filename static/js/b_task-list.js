url = "/api/v1/core/all-courses/";

getCourseList = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      data.forEach(element => {
          console.log(element.category);
          if (element.category == 3 && element.is_shared == true) {
            document.getElementById("list-here").innerHTML += `
            <div class="d-flex">
                              <div style="width: 84%;">
                                  <div class="card mb-3" style="max-width: 100%;">
                                      <div class="row no-gutters">
                                          <div class="col-md-4">
                                              <img src="${element.image}" class="card-img"
                                                  alt="...">
                                          </div>
                                          <div class="card__flex__column ml-3 my-3">
                                              <div class="mb-3">
                                                  <h3 class="card-title"><b>${element.title}</h3>
                                                  <p class="card-text" style="color: rgb(175, 169, 169);">${element.description}</p>
  
                                              </div>
                                              <div>
                                                  <i style="color: gray;" class="far fa-user"></i><small style="padding-left: 5px;color: gray;">from ${element.minimum_age} years</small>
                                                 
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div  style="height: 210px">
                                  <div class="ml-1">
                                      <div class="card" style="max-width: 100%; background-color:white;">
                                          <div class="text-success ml-2 mt-2">retund in case of visa rejection <span class="border border-success" style="padding: 2px 4px; border-radius:50%;">?</span></div>
                                          <br>
                                          
                                          <div class="ml-2" style="line-height: 15px;">
                                              <h5 class="">From ${element.price} $</h5>
                                              <small class="">for ${element.course_deadline} weeks</small>
                                              <br> 
                                              <br>
                                              <br> 
                                          </div>
                                      </div>
                                  </div>
                                  <a href="/course/${element.id}">
                                  <button type="button" style="padding: 8px 27px; border: none;color: white;background-color: mediumturquoise;"><h4>Choose a course</h4> </button>
                                  </a>
                                  </div>
  
                          </div>
            `
          }
          
      });
    })
}

getCourseList()