import React from "react";
import { data, endpoint } from "./data";
import { useState, useEffect,useRef} from "react";
import { Formik, Form} from "formik";
import { useGlobalContext } from "./Context";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import TextControl from "./components/Fieldcomponent";
import SelectControl from "./components/Selectcomponent";
import DateControl from "./components/Datecomponent";
import { toast } from 'react-toastify';
const DynamicForm = () => {
  const { currentItem ,uniqueStream,uniqueheader,uniqueParamsLen} = useGlobalContext();
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [timOptions, setTimOptions] = useState([]);
  let [submitBtnName,setSubmitBtnName]=useState();
  let time=[]
  let life=[]
  let [timeoptions, settimeoptions] = useState([]);
  let [lifeoptions, setlifeoptions] = useState([]);
  let [field,setfield]=useState([]);
  
  
  useEffect(() => {
    
    const index = uniqueStream.indexOf(currentItem);

    if (time[index] == undefined) settimeoptions([]);
    else settimeoptions(time[index]);

    if (life[index] == undefined) setlifeoptions([]);
    else setlifeoptions(life[index]);
   
      let x = [];
      let y = [];

      data

        .filter((item) => item.type == "select")

        .map((i) => {
          endpoint

            .filter(
              (item) => item.type == i.label && item.stream == currentItem
            )

            .map((filterdata) => {
              if (filterdata.type == "LifeTime") {
                x.push(filterdata.label);
              } else {
                y.push(filterdata.label);
              }
            });
        });

      setOptions(x);

      setTimOptions(y);
  
  }, [currentItem]);

  const [initval,setinitval] =useState ([]);
  const [jsonfile,setjsonfile] =useState ([]);
  let [comJsonFile, setComJsonFile] = useState([]);
  
  const finalObj = {};

  useEffect(() => {
      let arr=[]
      {
       data.map((item)=>{
       arr.push({[item.name]: item.initial?.[currentItem]})
      })
    }
    arr.map((item)=>{
      Object.assign(finalObj,item);
    })
  
  
       const index = uniqueStream.indexOf(currentItem);
       
      if (initval[index] ===undefined)
       
        setfield(finalObj)
      
       else setfield(initval[index])
       
     },[currentItem],[]);

  
  
  
  const toggle = (i) => {
    if (selected === i) return setSelected(null);

    setSelected(i);
  };
  const getValues=(values)=>{

     var sorted = {};
    
     for (var i = 0, max = data.length; i < max; i++) {
    
      if (sorted[data[i].header] == undefined) {
    
       sorted[data[i].header] = [];
    
      }
    
      sorted[data[i].header].push(data[i].name);
    
     }
    
     const obj2 = { credential: {}, parameter: {},path:{}, endpoint: {} };
    
     {
    
      uniqueheader.map((items, i) => {
    
       const array = sorted[items];
    
       const obj = values;
    
       function picker(array, obj) {
    
        return array.reduce(function (newObj, key) {
    
         if (key in obj) newObj[key] = obj[key];
    
         {
    
          if (items == "credentials" ) {
    
           obj2.credential = newObj;
    
           return newObj;
    
          }
    
          if (items == "parameters" ) {
    
           obj2.parameter = newObj;
    
           return newObj;
    
          }
    
          let final_arr = [];
    
          let concat_string = "";
    
         
    
          if (items == "path") {
    
           obj2.path = newObj;
    
           return newObj;
    
          }
    
          if (items == "Endpoint" ) {
    
           for (let i in values) {
    
            if (i == "life_time" || i == "time_bound") {
    
             let val = values[i];
    
             for (let j in val) {
    
              for (let k in endpoint) {
    
               if (
    
                val[j] == endpoint[k].label &&
    
                currentItem == endpoint[k].stream
    
               ) {
    
                concat_string += endpoint[k].value + ",";
    
                var trim = concat_string.replace(
    
                 /(^\s*,)|(,\s*$)/g,
    
                 ""
    
                );
                      const index = uniqueStream.indexOf(currentItem);
                      final_arr[index] = trim;
    
               }
    
              }
    
             }
    
            }
    
           }
    
           var res = final_arr.filter((elements) => {
    
            return elements !== null;
    
           });
    
           obj2.endpoint = res;
    
           return res;
    
          }
    
         }
    
        }, {});
    
       }
    
       picker(array, obj);
    
      });
    
     }
     const test = `{${currentItem}:` + (JSON.stringify(obj2) + "}");
    
     {
    
      const index = uniqueStream.indexOf(currentItem);
        initval[index] = values;
    
        time[index] = values.time_bound;
    
        life[index] = values.life_time;
    
        if(submitBtnName=="save")
    
        jsonfile[index] = test;
    
        else
    
        comJsonFile[index]=test;
    
       
    
     }
    
    }


  return (
    <div className="hero-container">
      <Formik
         
        key={`${currentItem}`}
        initialValues={field}
        enableReinitialize
        onSubmit={(values,e) => {

               if(submitBtnName=="save"){
          
                getValues(values);
          
                    setComJsonFile(jsonfile)
          
               toast.success("saved successfully")
          
              }
          
              else{
          
               setComJsonFile([])
          
               getValues(values);
          
               if(jsonfile==comJsonFile){
          
                alert(jsonfile)
          
               }
          
               else if(jsonfile!=comJsonFile){
          
                toast.error("save data before generating JSON")
          
               }
          
               else if(jsonfile.length==0){
          
                toast.error("save data before generating JSON")
          
               }
          
              }}}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              {uniqueheader.map((items, i) => {
                if (uniqueParamsLen[i] > 0) {
                  return (
                    <section className="question" key={i}>
                      <div className="title" onClick={() => toggle(i)}>
                        <h4 className="hd-btn">{items}</h4>

                        <span>
                          {selected === i ? (
                            <HiChevronUp></HiChevronUp>
                          ) : (
                            <HiChevronDown></HiChevronDown>
                          )}
                        </span>
                      </div>
                      <div
                        key={i}
                        className={selected === i ? "content show" : "content"}
                      >
                        {data
                          .filter(
                            (item) =>
                              item.header == items &&
                              item.stream.includes(currentItem)
                          )
                          .map((filteredlist, i) => (
                            <div className="form-row header" key={i}>
                              <label
                                htmlFor={filteredlist.name}
                                className="form-label"
                              >
                                {filteredlist.label}
                              </label>
                              {filteredlist.type=="date" &&(

               

                < DateControl id={filteredlist.id} values={values} setFieldValue={setFieldValue} {...filteredlist}

                />

               ) }
               
                            {
                             (filteredlist.type=="url" ||filteredlist.type=="text" )&&
                            <TextControl {...filteredlist} />
                            }

                            {filteredlist.type == "select" && (
                            <SelectControl {...filteredlist} setFieldValue={setFieldValue} options={options} timOptions={timOptions} lifeoptions={lifeoptions} timeoptions={timeoptions}/>
                            )}
                            </div>
                          ))}
                      </div>
                    </section>
                  );
                } else return null;
              })}
            </div>
            <div className="buttonContainer">

       <button

        type="submit"

        className="btn"

        name="save"

        onClick={(e)=>setSubmitBtnName(e.target.name)}

        onSubmit={Formik.onSubmit}

       

       >

        save data

       </button>

       <button type="submit" name="generate" className="btn"

       onClick={(e)=>setSubmitBtnName(e.target.name)}

       onSubmit={Formik.onSubmit}>

        generate JSON

       </button>

      </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForm;
