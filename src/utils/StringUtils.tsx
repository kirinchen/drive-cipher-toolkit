

export class StringUtils {

    public static genScope(sc: string[]): string {
        let ans = '';
        for (const s of sc) {
            ans += s + ' ';
        }
        return ans;
    }

}