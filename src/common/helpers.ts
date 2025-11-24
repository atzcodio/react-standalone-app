/* function name: GetNearestGridPoint
   function description: it will take canvas size and gridCount and return the nearest grid point to the given point.
   eg if canvas size in width is 1200 and gridCount is 12 then each grid point will be 100px.
   so if will pass getNearestGridPoint(1000, x) then it will return value between 0 to 11.
   if will pass getNearestGridPoint(1000, 1000) then it will return 11.
   */


   const XGRIDCOUNT = 12;
   const YGRIDSIZE = 10;
   export const GetNearestXGridPoint = (canvasSize: number, xPoint: number) => {
     const gridSize = canvasSize / XGRIDCOUNT;
     const nearestGridPoint = Math.round(xPoint / gridSize);
     return nearestGridPoint;
   };

   export const GetNearestYGridPoint = (yPoint: number) => {
     const nearestGridPoint = Math.round(yPoint / YGRIDSIZE);
     return nearestGridPoint;
   };

