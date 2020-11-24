package jp.co.runy.logical_thinking.exception;

/**
 * @author takahashikouhei
 * セッション情報の型変換時の例外処理.
 */
public class SessionTypeConversionExeption extends Exception {

    /**
     * シリアルバージョンUID.
     */
    private static final long serialVersionUID = 1L;
    
    public SessionTypeConversionExeption(String msg) {
        super(msg);
    }

}
