function addQuestion() {
    var typeQuestion = document.getElementById("typeQuestion").value;
    console.log(typeQuestion);
    typeQuestion = "4. " + typeQuestion;
    
    var questionText = document.getElementById("questionText").value;
    console.log(questionText);
    
    var answer1 = document.getElementById("answer1");
    
    console.log(answer1.checked);
    var answer2 = document.getElementById("answer2");
    console.log(answer2.checked);
    var answer3 = document.getElementById("answer3");
    console.log(answer3.checked);
    var answer4 = document.getElementById("answer4");
    console.log(answer4.checked);
    var answerText1 = document.getElementById("answerText1").value;
    
    console.log(answerText1);
    var answerText2 = document.getElementById("answerText2").value;
    console.log(answerText2);
    var answerText3 = document.getElementById("answerText3").value;
    console.log(answerText3);
    var answerText4 = document.getElementById("answerText4").value;
    console.log(answerText4);

    if (answer1.checked) {
        var cardAnswer1 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-success"></span> ${answerText1}
            </div>`
    } else {
        var cardAnswer1 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-danger"></span> ${answerText1}
            </div>`
    }
    if (answer2.checked) {
        var cardAnswer2 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-success"></span> ${answerText2}
            </div>`
    } else {
        var cardAnswer2 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-danger"></span> ${answerText2}
            </div>`
    }
    if (answer3.checked) {
        var cardAnswer3 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-success"></span> ${answerText3}
            </div>`
    } else {
        var cardAnswer3 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-danger"></span> ${answerText3}
            </div>`
    }
    if (answer4.checked) {
        var cardAnswer4 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-success"></span> ${answerText4}
            </div>`
    } else {
        var cardAnswer4 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-danger"></span> ${answerText4}
            </div>`
    }
    var cardHtml = `
    <div class="js-sortable-link sortablejs-custom sortablejs-custom-rotate sortablejs-custom-handle" data-href="#">
    <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex mb-5">
          <div class="mr-2">
            <h4 class="text-wrap">${typeQuestion} </h4>
            <h3 class="text-wrap">  ${questionText}</h3>
            <div class="divider"></div>
            <br>
            
              <div class="row">
              ${cardAnswer1}

              ${cardAnswer2}

              ${cardAnswer3}

              ${cardAnswer4}
              </div>
          </div>

          <div class="ml-auto">
            <!-- Unfold -->
            <div class="hs-unfold card-unfold">
              <a class="js-hs-unfold-invoker btn btn-icon btn-sm btn-ghost-secondary rounded-circle" href="javascript:;" data-hs-unfold-options='{
                 "target": "#kanbanProjectsGridDropdown4",
                 "type": "css-animation"
               }'>
                <i class="tio-more-vertical"></i>
              </a>

              <div id="kanbanProjectsGridDropdown4" class="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">
                  <i class="tio-edit dropdown-item-icon"></i> Sửa
                </a>
                <a class="dropdown-item" href="#">
                  <i class="tio-archive dropdown-item-icon"></i> Lưu trữ
                </a>

                <div class="dropdown-divider"></div>

                <a class="dropdown-item text-danger" href="#">
                  <i class="tio-delete-outlined dropdown-item-icon text-danger"></i>
                  Xoá
                </a>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </div>
    `;
    document.getElementById('tableQuestion').insertAdjacentHTML('beforeend', cardHtml);
    document.getElementById("typeQuestion").value = '';
    document.getElementById("questionText").value = '';
    document.getElementById("answer1").checked = false;
    document.getElementById("answer2").checked = false;
    document.getElementById("answer3").checked = false;
    document.getElementById("answer4").checked = false;
    document.getElementById("answerText1").value = '';
    document.getElementById("answerText2").value = '';
    document.getElementById("answerText3").value = '';
    document.getElementById("answerText4").value = '';
}

function readExcelFile(event) {
    var file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });

        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        var excelData = XLSX.utils.sheet_to_json(firstSheet);

        for (var i = 0; i < excelData.length; i++) {
            console.log("Dòng " + (i + 1) + ":");
            console.log(excelData[i]);
            addQuestionExcel((i + 4) + ". " + excelData[i]["Type"],
                            excelData[i]["Question"],
                            excelData[i]["Answer1"],
                            excelData[i]["Answer2"],
                            excelData[i]["Answer3"],
                            excelData[i]["Answer4"],
                            excelData[i]["Answertext1"],
                            excelData[i]["Answertext2"],
                            excelData[i]["Answertext3"],
                            excelData[i]["Answertext4"],
            )
        }
    };
    reader.readAsArrayBuffer(file);
}

function addQuestionExcel(typeQuestion, questionText, answer1, answer2, answer3, answer4,
    answerText1, answerText2, answerText3, answerText4) {
    if (answer1) {
        var cardAnswer1 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-success"></span> ${answerText1}
            </div>`
    } else {
        var cardAnswer1 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-danger"></span> ${answerText1}
            </div>`
    }
    if (answer2) {
        var cardAnswer2 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-success"></span> ${answerText2}
            </div>`
    } else {
        var cardAnswer2 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-danger"></span> ${answerText2}
            </div>`
    }
    if (answer3) {
        var cardAnswer3 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-success"></span> ${answerText3}
            </div>`
    } else {
        var cardAnswer3 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-danger"></span> ${answerText3}
            </div>`
    }
    if (answer4) {
        var cardAnswer4 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-success"></span> ${answerText4}
            </div>`
    } else {
        var cardAnswer4 = `
            <div class="col-6 h4">
            <span class="legend-indicator bg-danger"></span> ${answerText4}
            </div>`
    }
    var cardHtml = `
    <div class="js-sortable-link sortablejs-custom sortablejs-custom-rotate sortablejs-custom-handle" data-href="#">
    <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex mb-5">
          <div class="mr-2">
            <h4 class="text-wrap">${typeQuestion} </h4>
            <h3 class="text-wrap">  ${questionText}</h3>
            <div class="divider"></div>
            <br>
            
              <div class="row">
              ${cardAnswer1}

              ${cardAnswer2}

              ${cardAnswer3}

              ${cardAnswer4}
              </div>
          </div>

          <div class="ml-auto">
            <!-- Unfold -->
            <div class="hs-unfold card-unfold">
              <a class="js-hs-unfold-invoker btn btn-icon btn-sm btn-ghost-secondary rounded-circle" href="javascript:;" data-hs-unfold-options='{
                 "target": "#kanbanProjectsGridDropdown4",
                 "type": "css-animation"
               }'>
                <i class="tio-more-vertical"></i>
              </a>

              <div id="kanbanProjectsGridDropdown4" class="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">
                  <i class="tio-edit dropdown-item-icon"></i> Sửa
                </a>
                <a class="dropdown-item" href="#">
                  <i class="tio-archive dropdown-item-icon"></i> Lưu trữ
                </a>

                <div class="dropdown-divider"></div>

                <a class="dropdown-item text-danger" href="#">
                  <i class="tio-delete-outlined dropdown-item-icon text-danger"></i>
                  Xoá
                </a>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </div>
    `;
    document.getElementById('tableQuestion').insertAdjacentHTML('beforeend', cardHtml);
}