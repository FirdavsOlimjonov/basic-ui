import java.util.*;

public class Main {
    public static void main(String[] args) {

        int[] nums = {2,1,5,0,4,6};
        int count = 0;
        List<Integer> list = new ArrayList<>();

        for(int i = 0; i < nums.length; i++){
            if(count >= 3)
                System.out.println(true);
            if(i == 0)
                count++;
            else if(nums[i-1] < nums[i]){
                // ok = false;
                count = count == 0? count+2:count+1;
            }else
                count = 0;
        }
        System.out.println(false);
    }
}
