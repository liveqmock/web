var showDetail = function(info){
	Ext.create('Ext.window.Window',{
		title : '测试' ,
		items : {
			xtype : 'davidTriangle'
		}
	}).show();
};
Ext.onReady(function(){	
      var deviceType = getParams("deviceType");
      var deviceId   = getParams("deviceId");
	  var currentSubDeviceId = "";
	  var getPanelData = function(){
		  myAjax('loadSubDeviceData.htm',{
			  subDeviceId : currentSubDeviceId,
			  deviceId      : deviceId
		  },function(jsonData){
		      dataPanel.removeAll();
		      dataPanel.add(jsonData);
		  
		  })
	  };
	  var dataPanel = Ext.create('Ext.panel.Panel',{
	      border : false
	  });
	  var toolBar = Ext.create('Ext.toolbar.Toolbar',{
	  });
	  var viewport = Ext.create('Ext.container.Viewport',{
		  items : [toolBar,dataPanel]    
	  });

	  var mask = new Ext.LoadMask(Ext.getBody(),{msg:"loading,please wait.."});
      mask.show();
      myAjax('loadSubDevices.htm',{'deviceType':deviceType,'deviceId':deviceId},function(jsonData){      
		  for(var i=0;i<jsonData.length;i++){
		      toolBar.add({
				  xtype : 'button',
				  text  : jsonData[i]['text'],
				  subId : jsonData[i]['id'],
				  name  : jsonData[i]['name'],
				  listeners :{
					  click:function(){
						  currentSubDeviceId = this.subId;
						  getPanelData();
				      }
				  }
			  });
		  }
          mask.hide();
      });
	  getPanelData();
     // var subDevices =
	var tabs = Ext.create('Ext.tab.Panel',{
		defaultType : 'panel' ,
		border    : false ,
		items : [{
			//class1
			'title'   : '本体' ,
			border    : false ,
			'name'    : 'main',		
			'items'   : [{
				      //class2
				      'id'         : 'baseInfo',
				      title    : '基本信息' ,
				      'layout' : 'column',
				      bodyStyle: 'border-width:0 0 0 0',
				      padding   : '0 0 20 0',
				      defaultType : 'panel' ,
				      items     : [{
				    	  columnWidth:0.5,
//				    	  bodyStyle: 'border-width:0 0 0 0;',
				    	  border  : false ,
				    	  items   : [{
			                	xtype  : 'doTextPanel' ,
			                	doDesc : '顶层油温' ,
			                	doValue : '34℃' ,
			                	doState: '正常'
			                },{
			                	xtype  : 'doTextPanel' ,
			                	doDesc : '底层油温' ,
			                	doValue : '34℃' ,
			                	doState: '正常'
			                }]
				      },{
				    	  columnWidth:0.5,
//				    	  bodyStyle: 'border-width:0 0 0 0;',
				    	  border  : false ,
				    	  'items' : [{
				    		    xtype  : 'doTextPanel' ,
			                	doDesc : '寿命损失' ,
			                	doValue : '10%' ,
			                	doName  : 'lifeLose' ,
			                	doState: '正常' ,
			                	doUrl  : '详情',
				    	  }]
				      }]
				     
			         },{
			        	 //class2
				         id    : 'siml',
				         title    : '油色谱' ,
					     bodyStyle: 'border-width:0 0 0 0',
					     padding   : '0 0 20 0',
				         items : [{
				        	        //class3
				        	    xtype  : 'doTextPanel' ,
			                	doDesc : '油色谱' ,
			                	doState: '正常' ,
			                	doUrl  : '详情',
					        
			                      },{
			                    	  //class3
			                    	  xtype     : 'grid'  ,
			                    	  forceFit  : true ,
			                    	  columns   : [{
			                    		                text     : '监测时间',
			                    		                dataIndex: 'dataTime'
			                    	              },{
			                    	            	    text     : 'C2H2',
			                    		                dataIndex: 'C2H2'
			                    	              },{
			                    	            	    text     : 'H2',
			                    		                dataIndex: 'H2'
			                    	              },{
			                    	            	    text     : '分析详情',
			                    		                dataIndex: 'detail'
			                    	              }],	
			                    	  store      : {
			                    		                fields   : ['dataTime','C2H2','H2','detail'] ,			                    		                
			                    	                    data     : {'items':[{
			                    		                                           'dataTime' : '2012-2-11 09:00:00',			                    		                                           
			                    		                                           'C2H2'     : ['0','1'],
			                    		                                           'H2'       : ['45.7','2'],
			                    		                                           'detail'   : '<a  onclick = "showDetail(\'分析结果\')">详情</a>'
			                    	                                        },{
			                    	                                        	
			 			                    		                               'dataTime' : '2012-2-12 09:00:00',
			 			                    		                               'C2H2'     : '0',
			 			                    		                               'H2'       : '45.7',
			 			                    		                               'detail'   : '<a  onclick = "showDetail(\'分析结果\')">详情</a>'			 			                    	                                       
			                    	                                        }]
			                                                        },
			                                            proxy     : {
			                                            	           type        : 'memory',
			                                            	           reader      : {
			                                            	        	              type : 'json',
			                                            	        	              root : 'items',
			                                            	                         }
			                                                         }
			                    	              }
			            	      },{
			            	    	  //class3
			            	    	  xtype : 'label',
			            	    	  text  : '*气体组分含量数据单位：ppm'
			            	      }]
			       }]
		      },{
			        title : '套管' ,			       
		      }]
	});
   // dataPanel.add(tabs);
})
