public class circle2 {
    
   
    public double radius{get; set;}
    public double CalculateArea(double radius )
    {
          double areaofcircle = math.PI * math.pow(radius, 2);
            system.debug('Raidus is ' + radius);
        return areaofcircle;
        
    } 



}